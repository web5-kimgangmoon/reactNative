# 일주일간 세팅했습니다. 글이 길어져 다른 md 파일로 옮깁니다.

## 환경

1. ROG-Strix-G513RC-G513RC 노트북
2. muxless 스위치.
3. 외장그래픽: NVIDIA Corporation GA107M [GeForce RTX 3050 Mobile]
4. 내장그래픽: Advanced Micro Devices, Inc. [AMD/ATI] Rembrandt [Radeon 680M]
5. ubuntu-24.04-LTS
6. 커널버전
   1. 업데이트 전: 6.8.0-60.63
   2. 업데이트 후: 6.11.0-26.26~24.04.1
7. wayland

## 방법

0. 기본 세팅.

   - 매번 부팅시에(전체 작업과정 중에서 소작업이 아닌 5번 작업 완료전까진 무조건) grub menu에서 e버튼 클릭, 부팅옵션 리스트에서.

   ```bash
   GRUB_CMDLINE_LINUX_DEFAULT # 이 리스트 줄의 맨끝에 => acpi_osi=Linux 3 nouveau.modeset=0
   ```

   - sudo apt-get update
   - sudo apt-get upgrade -y
   - sudo reboot
   - sudo apt-get update
   - sudo apt-get upgrade -y
   - sudo reboot

   1. sudo apt-get install linux-generic
   2. sudo apt-get update
   3. sudo apt-get upgrade
   4. sudo apt-get install ubuntu-drivers-common
   5. sudo usermod -aG video [username] # 내가 설치했던 운영체제에선 video 그룹에 권한을 주지 않았다.
   6. sudo usermod -aG render [username] # 내가 설치했던 운영체제에선 video 그룹에 권한을 주지 않았다.
   7. sudo nano /etc/default/grub
      ```bash
      GRUB_DEFAULT=0
      GRUB_TIMEOUT_STYLE=hidden
      GRUB_TIMEOUT=0
      GRUB_DISTRIBUTOR=`( . /etc/os-release; echo ${NAME:-Ubuntu} ) 2>/dev/null || ec>
      GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=Linux" ## 이 줄에 `acpi_osi=Linux`만 추가.
      GRUB_CMDLINE_LINUX=""
      ```
   8. sudo update-grub
   9. sudo reboot

1. sudo apt-get install nvidia-driver-550 -y

2. sudo prime-select nvidia

3. nvidia-drm modeset=1 # 주석처리하거나 지워서 기본세팅으로.

   1. sudo nano /etc/modprobe.d/nvidia-graphics-drivers-kms.conf
   2. sudo nano /lib/modprobe.d/nvidia-kms.conf
   3. 그외엔 grep -r nvidia-drm # 추가적으로 탐색

4. sudo nano /etc/modprobe.d/blacklist-nouveau.conf ## grep -r /etc/modprobe.d로 확인후, 출력 없으면 추가

   ```bash
   blacklist nouveau
   options nouveau modeset=0
   ```

5. sudo update-initramfs -u

6. 사용자 계정 로그인 화면에서 오른쪽 맨아래에 있는 톱니바퀴(설정 버튼) 클릭, Ubuntu on Wayland 선택(Ubuntu on Xorg가 있다면 이미 기본 그래픽 시스템은 wayland) // X11을 원한다면 필요없음.

7. 크롬 설치. ## 파이어 폭스 unpin 추천.

   1. snap 패키지 자체의 불안정 때문인지, 파이어폭스도 심각하게 불안정하다. 그런고로 나는 크롬을 설치했다.
   2. 크롬 공식페이지에서 크롬 deb파일 다운.
   3. sudo dpkg -i [크롬deb파일디렉터리]
      // 4. 하드웨어 가속 unselect. ## 문제없이 동작.

8. 파이어폭스가 snap으로 설치되었다. 파이어폭스에서 제공하는 apt 저장소로 설치해도 소용없다. snap의 channel을 자꾸 참조하려 한다. 가능하면 삭제하시길.

   - sudo snap remove firefox

9. sudo reboot

10. snapd 삭제. ## 나같은 경우, 삭제하니 발열이 없어졌고, 정체모를 시스템 다운이 사라졌다.

    1. sudo systemctl stop snapd
    2. sudo apt purge snapd
    3. sudo rm -rf ~/snap /snap /var/snap /var/lib/snapd
    4. sudo apt-get autoremove
    5. sudo apt-get clean

    - 추가적으로 snap이 없으면 마치 deb 파일을 설치 못하는 것처럼 데스크탑이 작동하지만, 실제론 `sudo dpkg -i [패키지명]`으로 동작한다. snap이 deb 파일을 돌리는 것처럼 우분투 데스크탑이 작동하는 일에 속지 말자.

11. sudo reboot

12. sudo nano /usr/local/bin/prime-run
    출처:https://askubuntu.com/questions/1364762/prime-run-command-not-found

```bash
#!/bin/bash
export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export __VK_LAYER_NV_optimus=NVIDIA_only
export VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/nvidia_icd.json
exec "$@"
```

13. sudo chmod +x /usr/local/bin/prime-run

- prime-run으로 nvidia 오프로드 실행가능.
- prime-run으로 에뮬레이터 실행결과, radeontop과 nvidia-smi를 확인하니 재렌더링시 radeontop의 부하가 확실하게 줄었다. 25퍼까지도 올라가던 내장그래픽 부하가, prime-run 사용후 5퍼센트 정도까지만 올라가게 되었다.

p.s gemini답변: 자세히 설명하자면, lspci와 같은 Linux 도구에서 PCI 장치를 식별하는 데 사용되는 표기법입니다.

    01:00.0은 일반적으로 lspci의 출력에서 볼 수 있는 형식으로, 다음과 같은 의미를 가집니다.
        01: 버스(Bus) 번호를 나타냅니다.
        00: 장치(Device) 번호를 나타냅니다.
        0: 기능(Function) 번호를 나타냅니다. 하나의 물리적 장치에 여러 개의 논리적 기능이 있을 수 있습니다.

    PCI:1:0:0은 Xorg 설정 파일 등에서 장치를 지정할 때 사용되는 BusID 형식입니다. 이는 다음과 같이 매핑됩니다.
        PCI: PCI 장치임을 명시합니다.
        1: 버스(Bus) 번호 (위의 01에서 선행하는 0이 생략됨)
        0: 장치(Device) 번호
        0: 기능(Function) 번호

따라서, 두 표기법 모두 시스템 내의 버스 1, 장치 0, 기능 0에 위치한 동일한 하드웨어 장치를 가리킵니다. 단지 표현 방식이 다를 뿐입니다.

14. sudo nano /etc/apt/preferences.d/no-snapd

    ```bash
    Package: snapd
    Pin: release *
    Pin-Priority: -10
    ```

    - sudo apt-cache policy snapd
      - 해당 명령어로 우선순위 확인가능.

15. 재설치 됐을 경우, snapd 삭제.
    1. sudo systemctl stop snapd
    2. sudo apt purge snapd
    3. sudo rm -rf ~/snap /snap /var/snap /var/lib/snapd
    4. sudo apt-get autoremove
    5. sudo apt-get clean

// 16. amdgpu 발열 혹은 성능에 문제가 있을시. ### 내 노트북 환경 기준으로 호환성 이슈가 있었다. wayland가 기본인지 x11에서는 로그에 문제들이 보였고, wayland에선 nvidia와 충돌이 있었다. 커널에 내장된 amdgpu 추천.

    1. amdgpu-install 패키지를 검색, 공식사이트에서 deb 파일을 다운로드 및 설치한다.
    2. sudo apt-get remove --purge xserver-xorg-amdgpu-video-amdgpu
    3. sudo amdgpu-install
    - p.s. 난 amdgpu-install로 최신 드라이버 설치후 성능이 상승했다.

# 기타 명령어

1. dmesg | grep nvidia 혹은 dmesg | grep amd.
2. lspci -k | grep VGA -A3 # VGA라는 문자열이 포함된 줄을 3줄까지 출력.
3. lsmod | grep nvidia 혹은 lsmod | grep amd
4. glxinfo | grep "openGL renderer" # 현재 렌더링 중인 그래픽 카드.
5. journalctl -ex | grep <target> # X11에서만 가능
6. vulkaninfo | grep deviceName

# 추가적으로 설치하면 좋은 유틸들

1. tlp # cpu 전력과 발열 관리
2. corectrl # amd 그래픽카드 관리
3. radeontop # amd 그래픽카드 gpu 사용량 체크 가능.
4. glmark2 # 테스트 도구

# x11 환경에서 안정성을 높이려면?

1. sudo nano /etc/X11/xorg.conf.d/amdgpu.conf

```bash
Section "Device"
        Identifier "AMD"
        Driver "amdgpu"
        BusID "PCI:6:0:0"
        Option "Primary" "true"
EndSection

Section "Screen"
        Identifier "Screen0"
        Device "AMD"
        Monitor "Monitor0"
EndSection
```

2. sudo nano /etc/X11/xorg.conf.d/nvidia.conf

```bash
Section "Device"
        Identifier "NVIDIA"
        Driver "nvidia"
        BusID "PCI:1:0:0"
        Option "AllowEmptyInitialConfiguration" "true"
        Option "Primary" "false"
        Option "noRenderExtension" "true"
EndSection
```

# 개인적인 팁(일기)

1. 문제가 발생한다면 로그를 뒤지고 그걸로 안되면 snap을 뒤지자, 내 문제의 80프로의 책임은 snap이 가지고 있었다. 왜냐하면 snap이 그래픽 드라이버의 충돌을 만들어냈다.

2. 문제가 발견한다면 그래픽 드라이버를 뒤져보자. 내 문제의 20프로는 그래픽 드라이버가 쥐고 있었다. 로그를 통해 muxless의 경우, 외장이 디스플레이와 연결되어 있는지 내장 그래픽 카드와 연결됐는지 확인하자. source output(화면출력)인가? sink output(연산기능)인가.
