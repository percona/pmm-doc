# PMM Data Encryption Overview

To safeguard sensitive data, Percona PMM (Percona Monitoring and Management) employs encryption for critical fields stored in the `agent` table within the internal database. By default, this encryption is handled using an encryption key file, located at `/srv/pmm-encryption.key`, which PMM generates automatically during the first launch of version 3, or upon upgrading to version 3 from an earlier version.

This encryption mechanism ensures that sensitive information, such as access credentials and configuration details, is secured and accessible only to authorized PMM services.

## Custom Encryption Key Configuration

PMM also supports the option to use a custom encryption key, allowing you to manage your own key for enhanced control over your data security. To enable a custom encryption key:

1. **Define the Encryption Key Path**: Set the environment variable `PMM_ENCRYPTION_KEY_PATH` to the file path of your custom key. This configuration must be set **before** any data encryption occurs—specifically, either before upgrading to PMM version 3 or before the initial startup of a new PMM 3.x container.
   
2. **Encryption and Decryption**: Once configured, PMM will use this custom key to encrypt and decrypt all sensitive data stored within the system. This means that the specified key will be essential for PMM’s operation—if the custom key is unavailable or misplaced, PMM will be unable to access and decrypt the stored data, which will prevent it from running correctly. It’s essential to securely store and manage the custom encryption key to avoid any potential loss of data access.

## Regenerating or Rotating the Encryption Key

In cases where you need to change or update the encryption key—such as when the original key is compromised or as part of routine security maintenance—you can use the **PMM Encryption Rotation Tool**. This tool re-encrypts all existing sensitive data with a newly generated encryption key, ensuring continuous security with minimal disruption.

To rotate or regenerate the encryption key:

1. **Access the PMM Server Container**: Log in to the container running PMM Server.
   
2. **Run the Encryption Rotation Tool**: Execute the tool by running the command:
   ```bash
   pmm-encryption-rotation
    ```
   - If you are using a custom encryption key, ensure that the environment variable `PMM_ENCRYPTION_KEY_PATH` points to the current custom key to allow the tool to decrypt data before re-encryption.

3. **Key Generation and Data Re-encryption**: Once the rotation tool has completed, a new encryption key will be generated and saved either in the default location (`/srv/pmm-encryption.key`) or in the path specified by `PMM_ENCRYPTION_KEY_PATH`. The tool will automatically re-encrypt all sensitive data with the new key.

4. **Verification**: After the rotation process, PMM should continue to operate as usual. It’s recommended to verify that all components are functioning properly to ensure that the encryption key rotation was successful.

## Important Considerations for Custom Key Management

- **Backup and Security**: Always maintain a secure backup of your custom encryption key, especially when using `PMM_ENCRYPTION_KEY_PATH`, as it is essential for PMM’s data decryption process.
- **Environment Variable Persistence**: For containerized environments, ensure that the `PMM_ENCRYPTION_KEY_PATH` variable is persistently set within your container’s configuration to avoid issues during container restarts.
- **Testing**: If feasible, test the encryption key rotation process in a staging environment before applying it in production to minimize any potential downtime or configuration issues.

By following these steps and guidelines, you can ensure robust encryption for your sensitive data in Percona PMM, as well as manage and rotate encryption keys securely for optimal data protection.