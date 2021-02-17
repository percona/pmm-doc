# Virtual Appliance

Run PMM Server as a virtual machine by downloading and importing the [PMM {{release}}][OVA] Open Virtual Appliance (OVA) file into any virtualization software supporting the
[OVF standard][OVF].

This section shows how to do this for two example virtualization programs, [VMware Workstation Player][VMware] and [Oracle VM VirtualBox][VirtualBox].

!!! alert alert-info "OVA file details"
	- Download: <https://www.percona.com/downloads/pmm2/{{release}}/ova>
	- File name: `pmm-server-{{release}}.ova`
	- VM name: `PMM2-Server-{{release_date}}-N` (`N`=build number)
	- VM specifications: CentOS 7.9, 1 CPU, 4096 MB  base memory
	- Username/default password:
		- `root`/`percona`
    	- `admin`/`admin`


```plantuml source="_resources/diagrams/Setting-Up_Server_Virtual-Appliance.puml"
```

## 1. OVA file

### Download

*Download the PMM Server OVA and verify it.*

**With a browser**

1. [Visit the PMM Server download page][OVA].

1. Choose a *Version* or use the default (the latest).

1. Click the link for *pmm-server-{{release}}.ova*. Note where your browser saves it.

1. Right click the link for *pmm-server-{{release}}.sha256sum* and save the link to the same place as the `.ova` file.

**On the command line**

	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.ova
	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.sha256sum

### Verify

*Verify the checksum to check the integrity of the downloaded file.*

1. Open a terminal and change directory to where you saved the files.

1. Enter this command:

		shasum -ca 256 pmm-server-{{release}}.sha256sum

1. Check the result is `OK`.

### Import

*Import the virtual appliance and configure the network with your virtualization software's GUI or on the command line.*

#### Example: VMware Workstation Player

**With the GUI**

1. Click *File --> Import*.

1. Locate the downloaded `.ova` file, select it and click *Continue*.

1. TODO

**On the command line**

1. Install [`ovftool`][OVFTool] (You need a VMware account.)

1. Import (convert) the image. Choose:

	a. Download and import the OVA file.

		ovftool --name="PMM Server" --net:NAT=Wi-Fi https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.ova pmm-server-{{release}}.vmx

	b. Import an already-downloaded OVA file.

		ovftool --name="PMM Server" --net:NAT=WiFi pmm-server-{{release}}.ova pmm-server.vmx

	> `ovftool` can't change CPU or memory settings during import.

1. Start the virtual machine in GUI mode.

		vmrun -gu root -gp percona start \
		pmm-server.vmx gui

1. When the instance has booted, note the IP address in the VMware console. You can stop the instance and restart it in headless mode:

		vmrun stop pmm-server.vmx
		vmrun -gu root -gp percona start \
		pmm-server.vmx nogui


#### Example: Oracle VM VirtualBox

**With the GUI**

1. Click *File --> Import appliance...*.

1. In the *File* field, type the path to the downloaded `.ova` file, or click the folder icon to navigate and open it.

1. Click *Continue*.

1. On the *Appliance settings* page, review the settings and click *Import*.

1. Click *Start*.

1. The console will report the server's IP address. Make a note of it.



**On the command line**

1. Open a terminal and change directory to where you saved the `.ova` file

1. (Optional) See what values VirtualBox will use before importing.

		VBoxManage import pmm-server-{{release}}.ova --dry-run

1. Import the image. Choose:

	a. With the default settings (Name: "PMM2-Server-{{release_date}}-NNNN", CPUs: 1, RAM: 4096 MB)

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



## 2. Configure network

### Change from NAT to bridged

#### Example: Oracle VM VirtualBox

**With the GUI**

1. Click *Settings*.

1. Click *Network*.

1. In the *Adaptor 1* field, click *Attached to* and change to *Bridged Adaptor*.

1. In the *Name* field, select your host's active network interface (e.g. `en0: Wi-Fi (Wireless)`).

1. Click *OK*.

**On the command line**

The interface is








### Start virtual machine

#### Example: Oracle VM VirtualBox

**With the GUI**

1. Select the *PMM Server* virtual machine in the list.

1. Click *Start*.


**On the command line**

1.

		VBoxManage startvm --type headless 'PMM Server'

1. (Optional) Watch the log file.

		tail -f /tmp/pmm-server-console.log

1. Wait for one minute for the server to boot up.

1. Get the server's IP address from the log.

	grep -e "^IP:" /tmp/pmm-server-console.log | cut -f2 -d' '


Stop the virtual machine.

	VBoxManage controlvm "PMM Server" poweroff







## 3. Log in

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



## 4. Administration


### Change root password

1. Log into the virtual machine with the default superuser credentials:

	- Username: `root`
	- Password: `percona`

1. Follow the prompts to change the password.



### SSH access

1. In a terminal, create a key pair for the `admin` user.

		ssh-keygen -f admin
		cat admin.pub

1. In the PMM web interface, go to *PMM > PMM Settings > SSH Key* or visit <http://N.N.N.N/graph/d/pmm-settings/pmm-settings?menu=ssh-key> (`N.N.N.N` is the IP address for your PMM Server virtual machine).

1. Copy and paste the contents of `admin.pub` into the *SSH Key* field and click the *Apply SSH Key* button. (This copies the public key to `/home/admin/.ssh/authorized_keys`.)

1. In a terminal :

		ssh -i admin admin@N.N.N.N




### Static IP address

When the virtual machine starts, it will get an IP address from the virtual host's DHCP server.

As the IP can change when the virtual machine is restarted, you must use the UI to get the server's IP address.

You can avoid this by setting a static IP for the server.

1. Start the virtual machine in non-headless (GUI) mode.


1. TODO




!!! seealso "See also"
	- [vmrun command (PDF)][vmrun]



[OVA]: https://www.percona.com/downloads/pmm2/{{release}}/ova
[OVF]: https://www.dmtf.org/standards/ovf
[VirtualBox]: https://www.virtualbox.org/
[VMware]: https://www.vmware.com/products/workstation-player/
[VMwareDownload]: https://www.vmware.com/go/downloadworkstationplayer
[OVFTool]: https://code.vmware.com/tool/ovf

[vmrun]: https://www.vmware.com/pdf/vix180_vmrun_command.pdf
