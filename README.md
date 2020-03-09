# Persistence Harness
A development harness to test persistence rules across browsers

## Setting up your hosts
This persistence harness scaffolds three servers: two parent domains and one child domain.

To configure your domains you must:
* Update the server configurations
* Update your hosts file

### Updating the server configurations
To update the server configurations edit the file [src/config.js](./src/config.js) and plug in the domain you want to use for the two parents and one child.

### Updating your hosts file
You must ensure that you've updated your hosts file as well. On OSX use `sudo vim /etc/hosts` and be sure to add each domain you are using to the list to point to your local address:

```
127.0.0.1       foo.com
127.0.0.1       bar.com
127.0.0.1       baz.com
```

## Running the servers
To run the servers run `npm start` in your CLI.
