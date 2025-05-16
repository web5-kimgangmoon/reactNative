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

    4. 문제 해결 완료. 모든 문제는 gpu였다.

       1. 부팅 옵션에서 nomodeset 3으로 driver없이 cli 환경에서 설정. nouveau, nvidiafb, amdgpu 드라이버 비활성화(blacklist).

       2. dmesg | grep nvidia로 확인하며 에러없이 그래픽카드에 맞는 드라이버 설치.

       3. https:///forums.developer.nvidia.com/t/ubuntu-21-10-failed-to-grab-modeset-ownership-with-495-44/193867/51를 참고하여 error를 발생시키는 conf파일들을 찾아, nvidia-drm.modeset=1 옵션을 주석처리
       
       4. prime-select nvidia.

       5. sudo dmesg | grep nvidia

          ```bash
            [    1.827460] nvidia: loading out-of-tree module taints kernel.
            [    1.827473] nvidia: module license 'NVIDIA' taints kernel.
            [    1.827481] nvidia: module verification failed: signature and/or required key missing - tainting kernel
            [    1.827484] nvidia: module license taints kernel.
            [    1.972216] nvidia-nvlink: Nvlink Core is being initialized, major device number 235
            [    1.973715] nvidia 0000:01:00.0: enabling device (0000 -> 0003)
            [    1.973844] nvidia 0000:01:00.0: vgaarb: VGA decodes changed: olddecodes=io+mem,decodes=none:owns=none
            [    2.050146] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  550.144.03  Mon Dec 30 17:10:10 UTC 2024
            [    2.053808] [drm] [nvidia-drm] [GPU ID 0x00000100] Loading driver
            [    2.053812] [drm] Initialized nvidia-drm 0.0.0 for 0000:01:00.0 on minor 1
            [    2.075761] nvidia_uvm: module uses symbols nvUvmInterfaceDisableAccessCntr from proprietary module nvidia, inheriting taint.
            [    2.123644] nvidia-uvm: Loaded the UVM driver, major device number 511.
          ```

        6. p.s. 근데 로그 번역해봤더니, 웃기긴 하다. nvidia 공식 드라이버를 무슨 오염물질 취급하고 있다. ㅋㅋㅋㅋ. 여튼 우분투 os개발자들이 안 좋아할지 언정 시스템은 안정적으로 돌아가게 되었다.


          