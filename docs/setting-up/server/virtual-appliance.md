# Virtual Appliance

Run PMM Server as a virtual machine by downloading and importing the [PMM {{release}}][OVA] Open Virtual Appliance (OVA) file into any virtualization software supporting the
[OVF standard][OVF].

This section does this for two popular desktop hypervisors, [VMware Workstation Player][VMware] and [Oracle VM VirtualBox][VirtualBox].

Most steps can be done with either a user interface or on the command line, but some steps can only be done in one or the other. Section titles include symbols to show which approach can be used:
{{icon.mouse}} for user interface (UI) or {{icon.keyboard}} for command line (CLI).

!!! alert alert-info "OVA file details"
	- Download page: <https://www.percona.com/downloads/pmm2/{{release}}/ova>
	- File name: `pmm-server-{{release}}.ova`
	- VM name: `PMM2-Server-{{release_date}}-N` (`N`=build number)
	- VM specifications: CentOS 7.9, 1 CPU, 4096 MB  base memory
	- Username/default password:
		- `root`/`percona`
    	- `admin`/`admin`




```plantuml source="_resources/diagrams/Setting-Up_Server_Virtual-Appliance.puml"
```






## Download {{icon.mouse}} {{icon.keyboard}}

*Download the PMM Server OVA file and verify it.*

**UI {{icon.mouse}}**

1. Open a web browser.
1. [Visit the PMM Server download page][OVA].
1. Choose a *Version* or use the default (the latest).
1. Click the link for `pmm-server-{{release}}.ova`. Note where your browser saves it.
1. Right click the link for `pmm-server-{{release}}.sha256sum` and save the link to the same place as the `.ova` file.

**CLI {{icon.keyboard}}**

	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.ova
	wget https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.sha256sum







## Verify {{icon.keyboard}}

*Check the integrity of the downloaded file.*

**CLI {{icon.keyboard}}**

	shasum -ca 256 pmm-server-{{release}}.sha256sum










## Import {{icon.mouse}} {{icon.keyboard}}

*Import the virtual appliance into your hypervisor.*

### VMware Workstation Player

**UI {{icon.mouse}}**

1. Select *File --> Import*.
1. Click *Choose file...*.
1. Navigate to the downloaded `.ova` file and select it.
1. Click *Open*.
1. Click *Continue*.
1. In the *Save as* dialog:
	- (Optional) Change the directory or file name.
	- Click *Save*.

1. Either:
	- (Optional) Click *Finish*. This starts the virtual machine.
	- (Recommended) Click *Customize Settings*. This opens the VM's settings page without starting the machine.

**CLI {{icon.keyboard}}**

!!! alert alert-info "Notes"
	`ovftool` can't change CPU or memory settings during import but it can set the default interface.

1. Install [`ovftool`][OVFTool]. (You need a VMware account.)
1. Import and convert the OVA file. Either:
	- Download and import the OVA file.

			ovftool --name="PMM Server" --net:NAT=Wi-Fi\
			https://www.percona.com/downloads/pmm2/{{release}}/ova/pmm-server-{{release}}.ova pmm-server-{{release}}.vmx

	- Import an already-downloaded OVA file.

			ovftool --name="PMM Server" --net:NAT=WiFi\
			pmm-server-{{release}}.ova pmm-server.vmx

### Oracle VM VirtualBox

**UI {{icon.mouse}}**

1. Select *File --> Import appliance...*.
1. In the *File* field, type the path to the downloaded `.ova` file, or click the folder icon to navigate and open it.
1. Click *Continue*.
1. On the *Appliance settings* page, review the settings and click *Import*.
1. Click *Start*.
1. The console will report the server's IP address. ***Make a note of it***.

**CLI {{icon.keyboard}}**

1. Open a terminal and change directory to where the downloaded `.ova` file is.
1. (Optional) Do a 'dry run' import to see what values will be used.

		VBoxManage import pmm-server-{{release}}.ova --dry-run

1. Import the image. Either:

	a. With the default settings.

		VBoxManage import pmm-server-{{release}}.ova

	b. With custom settings (in this example, Name: "PMM Server", CPUs: 2, RAM: 8192 MB).

		VBoxManage import --vsys 0 --vmname "PMM Server"\
    	--cpus 2 --memory 8192 pmm-server-{{release}}.ova

1. Show the list of available bridge interfaces

		VBoxManage list bridgedifs

1. Find the name of the active interface you want to bridge to (one with *Status: Up* and a valid IP address). Example: `en0: Wi-Fi (Wireless)`

1. Bridge the virtual machine's first interface (`nic`) to the host's `en0` adaptor

		VBoxManage modifyvm 'PMM Server {{release}}'\
		--nic1 bridged --bridgeadapter1 'en0: Wi-Fi (Wireless)'

1. Redirect the console output into a host file.

		VBoxManage modifyvm 'PMM Server {{release}}'\
		--uart1 0x3F8 4 --uartmode1 file /tmp/pmm-server-console.log








## Reconfigure interface {{icon.mouse}}

*Change it from NAT to bridged so we can access PMM Server on the same network.*

!!! alert alert-info "Notes"
	When using the command line, the interface is remapped during import.

### VMware Workstation Player

**UI {{icon.mouse}}**

1. In the VMware main window, select the imported virtual machine.
1. Click *Virtual Machine --> Settings...*
1. Click *Network Adaptor*.
1. In the *Bridged Networking* section, select *Autodetect*.
1. Close the settings window.

#### Oracle VM VirtualBox

**UI {{icon.mouse}}**

1. Click *Settings*.
1. Click *Network*.
1. In the *Adaptor 1* field, click *Attached to* and change to *Bridged Adaptor*.
1. In the *Name* field, select your host's active network interface (e.g. `en0: Wi-Fi (Wireless)`).
1. Click *OK*.







## Get IP address {{icon.mouse}} {{icon.keyboard}}

*Start the virtual machine to learn which IP address the hypervisor allocated to the guest OS.*

### VMware Workstation Player

**UI {{icon.mouse}}**

1. In the VMware main window, select the imported virtual machine.
1. Click the play button {{icon.caretright}} or select *Virtual Machine --> Start Up*.
1. When the instance has booted, note the IP address in the guest console.

**CLI {{icon.keyboard}}/UI {{icon.mouse}}**

1. Start the virtual machine in GUI mode. (There's no way to redirect a WMware VM's console to the host.)

		vmrun -gu root -gp percona start \
		pmm-server.vmx gui

1. When the instance has booted, note the IP address in the guest console.
1. (Optional) Stop and restart the instance in headless mode.

		vmrun stop pmm-server.vmx
		vmrun -gu root -gp percona start \
		pmm-server.vmx nogui

#### Oracle VM VirtualBox

**UI {{icon.mouse}}**

1. Select the *PMM Server* virtual machine in the list.
1. Click *Start*.
1. When the instance has booted, note the IP address in the guest console.

**CLI {{icon.keyboard}}**

1. Start the guest.

		VBoxManage startvm --type headless 'PMM Server'

1. (Optional) Watch the log file.

		tail -f /tmp/pmm-server-console.log

1. Wait for one minute for the server to boot up.

1. Either:

	a. Read the IP address from the tailed log file.

	b. Extract the IP address from the log file.

		grep -e "^IP:" /tmp/pmm-server-console.log | cut -f2 -d' '

1. (Optional) Stop the guest:

		VBoxManage controlvm "PMM Server" poweroff























## Log in {{icon.mouse}}

1. Open a web browser and visit the guest IP address.
1. The PMM login screen appears.
	![image](../../_images/PMM_Login.jpg)
1. Enter the default username and password in the relevant fields and click *Log in*.
	- username: `admin`
	- password: `admin`
1. (Recommended) Follow the prompts to change the default password.
1. The PMM Home Dashboard appears.
	![image](../../_images/PMM_Home_Dashboard.jpg)






## Administer

### Change root password {{icon.mouse}}

1. Start the virtual machine in GUI mode.
1. Log in with the default superuser credentials:
	- Username: `root`
	- Password: `percona`
1. Follow the prompts to change the password.

### (Optional) Set up SSH {{icon.mouse}} {{icon.keyboard}}

1. Create a key pair for the `admin` user.

		ssh-keygen -f admin

1. Log into the [PMM web interface](#pmm-web-interface)
1. Select *PMM --> PMM Settings --> SSH Key*.
1. Copy and paste the contents of `admin.pub` into the *SSH Key* field.
1. Click *Apply SSH Key*. (This copies the public key to `/home/admin/.ssh/authorized_keys` in the guest).
1. Log in via SSH (`N.N.N.N` is the guest IP address).

		ssh -i admin admin@N.N.N.N

### (Optional) Set up static IP

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
