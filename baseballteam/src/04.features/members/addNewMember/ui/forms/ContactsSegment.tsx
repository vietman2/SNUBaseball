import { Segment, Vertical } from "../styles";
import { useContactInputs } from "@entities/members";
import { PhoneInput } from "@shared/ui/Inputs";

export function ContactsSegment() {
  const { phone, setPhone, email, setEmail, address, setAddress } =
    useContactInputs();

  return (
    <Segment>
      <Vertical>
        <span className="title">연락처</span>
        <PhoneInput
          value={phone}
          onChange={setPhone}
          placeholder="전화번호 입력 (예: 010-1234-5678)"
          data-testid="phone-input"
          required
        />
      </Vertical>
      <Vertical>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력 (예: example@domain.com)"
          data-testid="email-input"
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소 입력"
          data-testid="address-input"
        />
      </Vertical>
    </Segment>
  );
}
