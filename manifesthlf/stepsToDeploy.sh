#!/bin/bash
cd dist/ 
composer archive create -t dir -n ../ 
composer network install -a manifesthlf10@0.0.10.bna -c PeerAdmin@hlfv1 
composer network start -c PeerAdmin@hlfv1 -n manifesthlf10 -V 0.0.10 -A admin -S adminpw 
composer card import -f admin@manifesthlf10.card  
composer network ping -c admin@manifesthlf10