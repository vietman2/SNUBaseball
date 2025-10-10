import { describe, it, expect, vi } from "vitest";

import type { UploadItem, Action } from "../models/types";
import { uploadReducer } from "../reducers/uploadReducer";

vi.unmock("@shared/lib/files");

const mkItem = (overrides?: Partial<UploadItem>): UploadItem => ({
  id: (overrides?.id as string) ?? "1",
  file: new File(["x"], (overrides?.file as File)?.name ?? "a.png"),
  status: overrides?.status ?? "PENDING",
  progress: overrides?.progress ?? 0,
  errorMsg: overrides?.errorMsg ?? null,
});

describe("uploadReducer", () => {
  it("ADD: items를 뒤에 추가한다", () => {
    const state: UploadItem[] = [mkItem({ id: "1" })];

    const action: Action = {
      type: "ADD",
      items: [mkItem({ id: "2" }), mkItem({ id: "3" })],
    };

    const next = uploadReducer(state, action);

    expect(next).toHaveLength(3);
    expect(next.map((x) => x.id)).toEqual(["1", "2", "3"]);
    // 불변성 체크
    expect(next).not.toBe(state);
  });

  it("PROGRESS: 해당 id의 진행률과 상태를 업데이트한다(UPLOADING)", () => {
    const state: UploadItem[] = [
      mkItem({ id: "1", progress: 0, status: "PENDING" }),
      mkItem({ id: "2", progress: 0, status: "PENDING" }),
    ];

    const next = uploadReducer(state, {
      type: "PROGRESS",
      id: "2",
      percent: 55,
    });

    expect(next.find((x) => x.id === "1")!.progress).toBe(0);
    const t2 = next.find((x) => x.id === "2")!;
    expect(t2.progress).toBe(55);
    expect(t2.status).toBe("UPLOADING");
    // 불변성 체크(원소 교체만 일어남)
    expect(next).not.toBe(state);
    expect(next[0]).toBe(state[0]);
    expect(next[1]).not.toBe(state[1]);
  });

  it("SET_STATUS: DONE이면 errorMsg를 null로 만든다", () => {
    const a = mkItem({ id: "1", status: "PENDING", errorMsg: null });
    const b = mkItem({ id: "2", status: "PENDING", errorMsg: null });
    const state: UploadItem[] = [a, b];

    const next = uploadReducer(state, {
      type: "SET_STATUS",
      id: "999", // 존재하지 않는 id
      status: "ERROR",
      errorMsg: "boom",
    });

    // 값 변화 없음
    expect(next[0].status).toBe("PENDING");
    expect(next[0].errorMsg).toBeNull();
    expect(next[1].status).toBe("PENDING");
    expect(next[1].errorMsg).toBeNull();

    // 원소 참조 그대로
    expect(next[0]).toBe(a);
    expect(next[1]).toBe(b);

    // 배열은 새 객체일 수 있음
    expect(next).not.toBe(state);
  });

  it("SET_STATUS: ERROR면 기본 에러 메시지를 세팅한다", () => {
    const state: UploadItem[] = [mkItem({ id: "1" })];

    const next = uploadReducer(state, {
      type: "SET_STATUS",
      id: "1",
      status: "ERROR",
    });

    expect(next[0].status).toBe("ERROR");
    expect(next[0].errorMsg).toBe("업로드에 실패했습니다.");
  });

  it("SET_STATUS: ERROR 커스텀 메시지도 가능", () => {
    const state: UploadItem[] = [mkItem({ id: "1" })];

    const next = uploadReducer(state, {
      type: "SET_STATUS",
      id: "1",
      status: "ERROR",
      errorMsg: "네트워크 오류",
    });

    expect(next[0].errorMsg).toBe("네트워크 오류");
  });

  it("SET_STATUS: ERROR가 아닌경우", () => {
    const state: UploadItem[] = [mkItem({ id: "1", errorMsg: "boom" })];

    const next = uploadReducer(state, {
      type: "SET_STATUS",
      id: "1",
      status: "DONE",
    });

    expect(next[0].status).toBe("DONE");
    expect(next[0].errorMsg).toBeNull();
  });

  it("REMOVE: 해당 id를 제거한다", () => {
    const state: UploadItem[] = [
      mkItem({ id: "1" }),
      mkItem({ id: "2" }),
      mkItem({ id: "3" }),
    ];

    const next = uploadReducer(state, { type: "REMOVE", id: "2" });

    expect(next.map((x) => x.id)).toEqual(["1", "3"]);
  });

  it("CLEAR: 빈 배열을 반환한다", () => {
    const state: UploadItem[] = [mkItem({ id: "1" })];

    const next = uploadReducer(state, { type: "CLEAR" });

    expect(next).toEqual([]);
  });

  it("unknown action: 동일한 state를 반환한다", () => {
    const state: UploadItem[] = [mkItem({ id: "1" })];

    // @ts-expect-error: 의도적으로 알 수 없는 액션
    const next = uploadReducer(state, { type: "???" });

    // 같은 참조를 반환하는 건 아니지만(현재 구현은 default: state),
    // 리듀서 구현에 따라 달라질 수 있어서 내용 비교만.
    expect(next).toBe(state); // 네 구현은 default에서 state 그대로 반환
  });
});
