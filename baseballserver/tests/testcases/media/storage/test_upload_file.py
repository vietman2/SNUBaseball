from apps.media.storage.services import upload_file


def test_upload_file_success():
    res = upload_file(
        key="tests/a.pdf", file_data=b"data", content_type="application/pdf"
    )
    assert res == {"ResponseMetadata": {"HTTPStatusCode": 200}}
