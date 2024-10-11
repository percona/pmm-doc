# Troubleshooting Upgrade Issues

## PMM Server not Updating correctly

If you encounter issues during the PMM Server update process or have concerns about the release, you can force the update process using one of the following methods:

### Method 1: Force update via UI

1. Go **Home** dashboard >  **Update** panel.
2. Press and hold the *Alt* key while clicking the Refresh icon. This will make the **Update** button visible, even if you're on the same version as available for update.
3. Click the **Update** button to force the system to rerun the update process.
4. Monitor the update logs that appear during the process.
5. Wait for the successful completion message at the end.

### Method 2: Force update via API call

If the UI is not accessible, you can trigger the update process using an API call:

1. Open a terminal or command prompt.
2. Run the following curl command:

   ```sh
   curl --user admin:admin --request POST 'http://PMM_SERVER/v3/server/updates:start'