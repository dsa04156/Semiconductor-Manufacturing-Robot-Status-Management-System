import paramiko
import time
import boto3


def s3_connection():
    try:
        # s3 클라이언트 생성
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2",
            aws_access_key_id='AKIA5Z3I5G4VISKY7QLC',
            aws_secret_access_key='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',
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!") 
        return s3
# SSH 연결 설정
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('3.36.125.122', port=8282, username='root', password='root')
s3 = s3_connection()
# 감지할 디렉토리 경로
watch_dir = '/app/test'

# SSH 클라이언트를 이용하여 원격 서버에서 파일 생성 감지
while True:
    stdin, stdout, stderr = ssh.exec_command('inotifywait -q -m -e create "{}"'.format(watch_dir))
    for line in stdout:
        # 파일 생성 이벤트가 감지되면 이 부분에서 원하는 작업을 수행합니다.
        filename = line.strip().split()[-1]  # 파일 이름 추출
        sftp = ssh.open_sftp()
        remote_file_path = f"{watch_dir}/{filename}"
        local_file_path = f"/app/csv/{filename}"  # 로컬 디렉토리에 저장할 파일 경로
        sftp.get(remote_file_path, local_file_path)  # 파일 가져오기
        print("파일 가져왔다")
        try:
            s3.upload_file(f"/app/csv/{filename}","wonik-data",f"{filename}")
        except Exception as e:
            print(e)
        sftp.close()
    time.sleep(1)
