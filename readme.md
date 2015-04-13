Node CLI - Non-persistent in-memory datastore
===

To Install and Run
---

1. If you do not already have Node.js installed and are on mac, **open the Terminal app** and type `brew install node`.
2. `npm install -g tempdb-class`.
3. run database any time with `tempdb-class`.



Data Commands
---

- SET name value – Sets the variable name to the value value. Variable names and values cannot contain spaces.
- GET name – Prints out the value of the variable name, or NULL if that variable is not set.
- UNSET name – Unsets the variable name, making it just like that variable was never set.
- NUMEQUALTO value – Prints out the number of variables that are currently set to value. If no variables equal that value, returns 0.
- END – Exits the program.


Transaction Commands
---

Database supports transactions with commands:

- BEGIN – Opens a new transaction block. Transaction blocks can be nested; a BEGIN can be issued inside of an existing block.
- ROLLBACK – Undoes all of the commands issued in the most recent transaction block, and closes the block. Prints nothing if successful, or prints NO TRANSACTION if no transaction is in progress.
- COMMIT – Closes all open transaction blocks, permanently applying the changes made in them. Prints nothing if successful, or prints NO TRANSACTION if no transaction is in progress.

