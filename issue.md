# issues

1. emulator is crashed, i used this command. it's gpu issue.

```bash
cd ~/.android/avd/(avd_name)
vi config.ini
# hw.gpu.mode = swiftshader_indirect
# hw.gpu.enabled = yes
```

2. 우분투 crash 문제. 30분에 한 번 심하면 3분에 한 번 꼴로 시스템 전체가 crash나고 먹통이 됐다. firefox도 건드리고, 패키지 관리자로 업데이트도 해봤고 dist-upgrade 명령어로 의존성 문제를 해결도 해봤지만 소용이 없었다.

   - 그리고 방법을 찾아보다가 우연히 그래픽 시스템에 대해 알게되었다. x11과 wayland에 대해 알게 되었다.

     1. x11은 모놀리틱에 40년 가까이 된 그래픽시스템이며, 그에 따라 한 앱에 문제가 생겨도 전부 다운되어 버렸다.

     2. wayland는 다소 실험적이지만 각 앱이 그래픽을 따로 담당하고 있어 한 앱에서 문제가 터지더라도 시스템이 다운되지 않게 됐다.

   - 해결이 어떻게 됐는지는 정확하게 모르겠지만, (분산된 아키텍처 덕에 한 앱에서 문제가 생겨도 동작하는가 아니면 x11보다 wayland가 내 노트북의 그래픽카드 드라이버와 호환이 잘되는가.) wayland로 그래픽 시스템을 바꾸니 크래시없이 돌아가게 되었다.

   - p.s. 파이어폭스는 아직도 확인이 필요할 듯 보인다.

   - 문제 해결은 안됨. 일단 복구모드로 복구함. 복구 못했다. 그래픽 카드 재설치, sudo dpkg configure -a 옵션으로 그래픽 카드 재설정.

   - x11로 다시 그래픽 시스템을 되돌렸다. 현재까진 문제없음.

   - graphic card 문제일 가능성이 높다고 판단, 왜냐면 시스템이 다운되어 종료했음에도 왜인지 이전 세션 정보나 코드 작성내용은 대체로 보존되어 있었다.

   - 현재 booting 옵션에 nomodest를 추가하여 커널이 아닌 소프트웨어에 gpu 제어를 위임. 풀었다.

   - 원인 발견. 로그를 아무리 뒤져봐도 명확한 원인을 찾지 못했는데, 그 이유는 결국 그래픽 드라이버 간의 충돌 때문이었다.

     1. ndividia 드라이버가 깔린 상태에서 nouveau 드라이버가 같이 깔려 서로 충돌이 일어났다.

     2. 에러로 인식을 못했는지 아니면 에러로 인식을 해도 후속오류 때문인지 로그에 남질 않았다.

     3. 덕분에 3일간을 원인 찾기에 매달려야 했다.

  - gpu가 문제의 핵심이었다.

    1. nouveau가 듀얼 

     ```bash
     sudo nano /etc/modprobe.d/blacklist-nouveau.conf
     ## this text
     options nouveau modeset=0
     sudo update-initramfs -u
     sudo reboot
     ```

    2. nvidia 드라이버 설치(mig 기능없는 드라이버로), ubuntu는 드라이버가 지닌 기능과 관계없이 무조건 최신버전을 설치했고, 그결과 mig 기능이 없는 내 노트북 그래픽카드에서 path를 못 찾아 자꾸 시스템이 다운됐다.

    ```bash
    sudo apt-get install nvidia-driver-535 -y
    ```

    3. prime-select nvidia, 내가 쓰던 노트북은 그래픽 카드가 amd계열, nvidia계열이였고 그때문에 사실상 amd를 쓸 수 없었다. 애초에 호환이 안되고 서로, 커널에 내장된 그래픽 드라이버와 nvidia 드라이버가 충돌이 생겼다.