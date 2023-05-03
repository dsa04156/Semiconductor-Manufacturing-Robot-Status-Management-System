import paramiko
import time

# SSH 연결 설정
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('3.36.125.122', port=8282, username='root', password='root')

# 감지할 디렉토리 경로
watch_dir = '/app/test'

# SSH 클라이언트를 이용하여 원격 서버에서 파일 생성 감지
while True:
    stdin, stdout, stderr = ssh.exec_command('inotifywait -q -m -e create "{}"'.format(watch_dir))
    for line in stdout:
        # 파일 생성 이벤트가 감지되면 이 부분에서 원하는 작업을 수행합니다.
        print(12)
        print(line.strip())
    time.sleep(1)
