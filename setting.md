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

## 방법

0. X11 환경, sudo apt-get update, sudo apt-get upgrade, muxless.

   1. sudo apt-get install linux-generic
   2. sudo apt-get update
   3. sudo apt-get upgrade
   4. sudo apt-get install ubuntu-drivers-common

1. nvidia-driver-570 버전 설치.

2. nvidia-drm modeset=1 주석처리하거나 지워서 기본세팅으로.

   1. sudo nano /etc/modprobe.d/nvidia-graphics-drivers-kms.conf
   2. sudo nano /lib/modprobe.d/nvidia-kms.conf
   3. 그외엔 grep -r nvidia-drm # 추가적으로 탐색
   4. sudo nano /etc/modprobe.d/blacklist-nouveau.conf // 없으면 추가

   ```bash
   blacklist nouveau
   options nouveau modeset=0
   ```

   5. sudo update-initramfs -u

3. sudo nano /etc/prime-discrete

```bash
unknown
```

4. sudo nano /usr/local/bin/prime-run

```bash
#!/bin/bash

export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
"$@"
```

5. sudo chmode +x /usr/local/bin/prime-run

6. sudo /ext/default/grub

   ```bash
   GRUB_DEFAULT=0
   GRUB_TIMEOUT_STYLE=hidden
   GRUB_TIMEOUT=0
   GRUB_DISTRIBUTOR=`( . /etc/os-release; echo ${NAME:-Ubuntu} ) 2>/dev/null || ec>
   GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=Linux" ## 이 줄에 `acpi_osi=Linux`만 추가.
   GRUB_CMDLINE_LINUX=""
   ```

7. sudo update-grub

8. nvidia-smi -i [target gpu] -pm ENABLED
   - 명령어 nvidia-smi로 target gpu의 index번호를 확인 가능. (필요하면 사용) ## 비추천, 전력관리 시스템과 충돌난다는 chatgpt의 답변이 있었고 실제로 사용후 충돌이 있었다.

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

9. 파이어폭스가 최신버전이 아니다. 직접 파이어폭스 페이지에 들어가서 설치 및 업데이트가 필요하다. 우분투 24버전 기준으로 파이어폭스가 최신버전이 아닐시에 우분투 22버전 코어를 파이어폭스가 사용한다는 이슈가 커뮤니티에서 나왔었다.

# 기타 명령어

1. dmesg | grep nvidia 혹은 dmesg | grep amd.
2. lspci -k | grep VGA -A3 # VGA라는 문자열이 포함된 줄을 3줄까지 출력.
3. lsmod | grep nvidia 혹은 lsmod | grep amd
4. glxinfo | grep "openGL renderer" # 현재 렌더링 중인 그래픽 카드.
5. journalctl -ex | grep <target> # X11에서만 가능

# 추가적으로 설치하면 좋은 유틸들

1. tlp # cpu 전력과 발열 관리
2. corectrl # amd 그래픽카드 관리
3. radeontop # amd 그래픽카드 gpu 사용량 체크 가능.
4. glmark2 # 테스트 도구
