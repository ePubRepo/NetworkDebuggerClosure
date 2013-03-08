#!/bin/bash

#FINALIZED DEV CODE (depswriter.py)
#http://code.google.com/closure/library/docs/depswriter.html
./closure-library/closure/bin/build/depswriter.py --output_file=closure-myfiles/deps.js --root_with_prefix="js ../../../js"
