import os
from pathlib import Path

import paramiko


def main():
    src_folder = "/home/lepton/projects/aivoucher/data/fixed"
    dst_folder = "C:\\Users\\Goback\\Desktop\\test"

    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        ssh.connect("192.168.0.17", username="lepton", password="lepton@2022")    # 대상 IP, User명, 패스워드 입력
        print('ssh connected.\n')
        
        # File Upload
        sftp = ssh.open_sftp()
        
        _, stdout, _ = ssh.exec_command(f"cd {src_folder}; ls -l")   # ssh 접속한 경로에 디렉토리 및 파일 리스트 확인 명령어 실행
        lines = stdout.readlines()
        for i in lines:    # for문을 통해 명령어 결과값 출력.
            re = str(i).replace('\n', '')
            folder = re.split(' ')[-1]
            if 'camera' in folder:
                remote_camera_folder = src_folder+'/'+folder+'/raw'
                _, stdout, _ = ssh.exec_command(f"cd {remote_camera_folder}; ls -l")
                lines = stdout.readlines()
                for i in lines:    # for문을 통해 명령어 결과값 출력.
                    re = str(i).replace('\n', '')
                    date_ = re.split(' ')[-1]
                    if '-' in date_:
                        remote_date_folder = remote_camera_folder+'/'+date_
                        local_data_folder = os.path.join(dst_folder, folder, date_)
                        # if not os.path.exists(local_data_folder):
                        Path(local_data_folder).mkdir(parents=True, exist_ok=True)
                        _, stdout, _ = ssh.exec_command(f"cd {remote_date_folder}; ls -l")
                        lines = stdout.readlines()
                        
                        for i in lines:    # for문을 통해 명령어 결과값 출력.
                            re = str(i).replace('\n', '')
                            file_name = re.split(' ')[-1]
                            if '.tiff' in file_name:
                                src_file_path = remote_date_folder+'/'+file_name
                                dst_file_path = os.path.join(local_data_folder, file_name)
                                print(src_file_path)
                                print(dst_file_path)
                                sftp.get(src_file_path, dst_file_path)
        print('sftp download success.\n')    
        ssh.close()

    except Exception as err:
        print(err)


if __name__ == "__main__":
    main()