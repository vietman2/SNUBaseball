from django.conf import settings
import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    endpoint_url=settings.AWS_S3_ENDPOINT_URL,
    region_name='kr-standard',
)

def list_objects(directory):
    prefix = f'{directory}/'
    response = s3.list_objects_v2(
        Bucket=settings.AWS_STORAGE_BUCKET_NAME,
        Prefix=prefix,
        Delimiter='/',
    )

    objects = [obj['Key'].replace(prefix, '') for obj \
               in response.get('Contents', []) if obj['Key'] != prefix]

    subdirectories = [common_prefix['Prefix'].replace(prefix, '') for common_prefix \
                      in response.get('CommonPrefixes', [])]

    return {
        'objects': objects,
        'subdirectories': subdirectories,
    }
