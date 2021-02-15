# Virtual Appliance

---

[TOC]

---

You can run PMM Server as a virtual machine using our *Open Virtual Appliance* (OVA) package.

> [Download OVA for PMM {{release}}][OVA]

The package contains an Open Virtualization Format (OVF) virtual machine file that you import into any virtualization software that supports the [OVF standard][OVF].

When running, the virtual machine hosts the latest PMM Server preinstalled on a CentOS 7.9 Linux guest OS with 1 CPU and 4096 MB of base memory.

This page shows how to import the appliance into two popular virtualization programs, [VMware Workstation Player][VMware] and [Oracle VM VirtualBox][VirtualBox].

## Overview

1. Download and install your choice of virtualization software

2. [Download and verify the PMM Server OVA](#download-pmm-server-ova)

3. [Import the virtual appliance](#import-the-virtual-appliance)

	a. Configure the virtual machine's network

	b. Get the virtual machine's IP address

4. Start the virtual appliance

5. Open a web browser and log in to PMM

6. (Optional) Log into PMM Server via SSH







## Download PMM Server OVA

**With a browser**

1. [Go to the PMM Server download page][OVA]

1. Choose a *Version* or use the default (the latest)

1. Click the link for *pmm-server-{{release}}.ova*. Note where your browser saves it.

1. Right click the link for *pmm-server-{{release}}.sha256sum* and save the link to the same place as the `.ova` file.

**On the command line**

	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.ova
	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.sha256sum

**Verify the download**

1. Open a terminal and change directory to where you saved the files.

1. Type

		shasum -ca 256 pmm-server-{{release}}.sha256sum

1. Check the result is `OK`




## Import the virtual appliance and configure the network

You can import the OVA with your virtualization software's GUI or on the command line.

### With the GUI



**VMware Workstation Player**

1. Click *File --> Import*.

1. Locate the downloaded `.ova` file, select it and click *Continue*.

1. TODO





**Oracle VM VirtualBox**

1. Click *File --> Import appliance...*.

1. In the *File* field, type the path to the downloaded `.ova` file, or click the folder icon to navigate and open it.

1. Click *Continue*.

1. On the *Appliance settings* page, review the settings and click *Import*.

1. Click *Settings*.

1. Click *Network*.

1. In the *Adaptor 1* field, click *Attached to* and change to *Bridged Adaptor*.

1. In the *Name* field, select your host's active network interface (e.g. `en0: Wi-Fi (Wireless)`).

1. Click *OK*.

1. Click *Start*.

1. The console will report the server's IP address. Make a note of it.








### On the command line

**VMware Workstation Player**

Install [`ovftool`][OVFTool] (You must have or sign up for a VMware account.)

	ovftool pmm-server-{{release}}.ova ~/Virtual Machines

	vmrun \
	-gu root -gp percona \
	start --nogui \
	~/Virtual Machines/PMM2-Server-{{release_date}}-NNNN.vmx


To stop

	vmrun stop ~/Virtual Machines/PMM2-Server-{{release_date}}-NNNN.vmx

**Oracle VM VirtualBox**

1. Open a terminal and change directory to where you saved the `.ova` file

1. (Optional) See what values VirtualBox will use before importing.

		VBoxManage import pmm-server-{{release}}.ova --dry-run

1. Import the image

	a. (Optional) With the default settings (Name: "PMM2-Server-{{release_date}}-NNNN", CPUs: 1, RAM: 4096 MB)

		VBoxManage import pmm-server-{{release}}.ova

	b. With custom settings (Name: "PMM Server", CPUs: 2, RAM: 8192 MB)

		VBoxManage import --vsys 0 --vmname "PMM Server {{release}}" \
    	--cpus 2 --memory 8192 pmm-server-{{release}}.ova

1. Show the list of available bridge interfaces

		VBoxManage list bridgedifs

1. Find the name of the active interface you want to bridge to (one with *Status: Up* and a valid IP address). Example: `en0: Wi-Fi (Wireless)`

1. Bridge the virtual machine's first interface (`nic`) to the host's `en0` adaptor

		VBoxManage modifyvm 'PMM Server {{release}}' \
		--nic1 bridged --bridgeadapter1 'en0: Wi-Fi (Wireless)'

1. Redirect the console output into file

		VBoxManage modifyvm 'PMM Server {{release}}' \
		--uart1 0x3F8 4 --uartmode1 file /tmp/pmm-server-console.log

1. Start the virtual machine

		VBoxManage startvm --type headless 'PMM Server {{release}}'

1. Wait for one minute for the server to finish booting up.

1. Get the server's IP address from the log.

	grep -e "^IP:" /tmp/pmm-server-console.log | cut -f2 -d' '

To stop the virtual machine

	VBoxManage controlvm "PMM Server" poweroff


## Logging in

### PMM Server web interface

1. Open a web browser and visit the server's IP address.

1. The PMM login screen appears.

	![image](../../_images/PMM_Login.jpg)

1. Log in with the default username and password:

	- username: `admin`
	- password: `admin`

1. (Recommended) PMM prompts you to change the default password.

1. The PMM Home Dashboard appears.

	![image](../../_images/PMM_Home_Dashboard.jpg)



## Networking

When the virtual machine starts, it will get an IP address from the virtual host's DHCP server.

### Assign a static IP address

1. Log into the virtual machine as root.



    Log in as `root`, password `percona` and follow the prompts to change the password.



## Logging in via SSH

1. In a terminal, create a key pair for the `admin` user.

		ssh-keygen -f admin
		cat admin.pub

1. In the PMM web interface, go to *PMM > PMM Settings > SSH Key* or visit <http://N.N.N.N/graph/d/pmm-settings/pmm-settings?menu=ssh-key> (`N.N.N.N` is the IP address for your PMM Server virtual machine).

1. Copy and paste the contents of `admin.pub` into the *SSH Key* field and click the *Apply SSH Key* button. (This copies the public key to `/home/admin/.ssh/authorized_keys`.)

1. In a terminal :

		ssh -i admin admin@N.N.N.N






[OVA]: https://www.percona.com/downloads/pmm2/{{release}}/ova
[OVF]: https://www.dmtf.org/standards/ovf
[VirtualBox]: https://www.virtualbox.org/
[VMware]: https://www.vmware.com/products/workstation-player/
[VMwareDownload]: https://www.vmware.com/go/downloadworkstationplayer
[OVFTool]: https://code.vmware.com/tool/ovf
