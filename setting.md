# 일주일간 세팅했습니다. 글이 길어져 다른 md 파일로 옮깁니다.


0. X11 환경, sudo apt-get update, sudo apt-get upgrade, muxless.

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

6. nvidia-smi -i [target gpu] -pm ENABLED
    - 명령어 nvidia-smi로 target gpu의 index번호를 확인 가능.

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