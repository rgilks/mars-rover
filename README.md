# Mars Rover 

Developer Programming Problem implemented in Node.js 

The full problem description is given in the **Coding_Challenge_2017_Final_.pdf** file which is not included in this 
repo.

## Getting Started

### Prerequisites

You need to have Node.js (preferably v8.9.3) and npm installed.

https://docs.npmjs.com/getting-started/installing-node

### Installing

The easiest way to run this is to install the module as a global command.

```
npm install -g 
```

That will install the **mars-rover** command

The command takes input from stdin and sends output to stdout, so you can pipe a file into it and see the output in the
terminal as follows:

```
mars-rover < sample_files/sample-input.txt 
```

Expected result from sample-input.txt:
```
1 1 E
3 3 N LOST
2 3 S
```


If you want to send the output to a file:

```
mars-rover < sample_files/sample-input.txt > output.txt
```

## Running the tests

```
npm run test
```

### Coding style

This project uses the [Standard JS](https://standardjs.com/) coding style.

```
npm run lint
```

## Author

* **Robert Gilks**
