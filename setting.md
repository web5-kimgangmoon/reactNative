# 일주일간 세팅했습니다. 글이 길어져 다른 md 파일로 옮깁니다.

0. x11 그래픽 시스템

1. nouveau 블랙리스트, nvidiafb 블랙리스트.

   ```bash
   sudo nano /etc/modprobe.d/blacklist-nouveau.conf
   ## this text
   options nouveau modeset=0
   sudo update-initramfs -u
   sudo reboot
   ```

2. nvidia-driver-550 버전, sudo prime-select on-demand

3. https://forums.developer.nvidia.com/t/ubuntu-21-10-failed-to-grab-modeset-ownership-with-495-44/193867/51에서 설명대로 conf 파일들의 options nvidia-drm modeset=1 하나만 빼고 전부 지우기.

4. sudo nano /etc/X11/xorg.conf.d/10-amdgpu.conf

```bash
Section "Device"
	Identifier "AMD"
	Driver "amdgpu"
	BusID "PCI:X:X:X"
EndSection

# PCI는 lspci | grep VGA에서 맨 앞의 01:00.0처럼, 이 숫자들을 1:0:0으로 맞추는 식으로 하면된다.
```

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

5. dmesg | grep nvidia 혹은 dmesg | grep amd.
6. lspci -k | grep VGA -A3 # VGA라는 문자열이 포함된 줄을 3줄까지 출력.
7. lsmod | grep nvidia 혹은 lsmod | grep amd
8. glxinfo | grep "openGL renderer" # 현재 렌더링 중인 그래픽 카드.
