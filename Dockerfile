# python 이미지 다운
FROM python:3.8.12
# 컨테이너 속, 명령어 사용할 경로 지정 ( 작업 디렉토리 )
WORKDIR /app
# 현재 폴더에 있는 내용 복사, 작업 디렉토리에 붙여넣기
COPY . .
# requirements.txt 파일로, 추후에 라이브러리 추가 하기
RUN pip install --no-cache-dir -r requirements.txt
# 작업 디렉토리에서, 명령어 사용하기, 시작 프로그램 실행
# CMD [ "python", "./setup.py" ]
# 시작 프로그램 마친후에, 메인 프로그램 실행
ENTRYPOINT ["python3.8", "CsvFileMaker.py"]