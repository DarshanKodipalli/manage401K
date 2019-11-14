#!/bin/bash
cd dist/ 
composer archive create -t dir -n ../ 
composer network install -a manifesthlf12@0.0.12.bna -c PeerAdmin@hlfv1 
composer network start -c PeerAdmin@hlfv1 -n manifesthlf12 -V 0.0.12 -A admin -S adminpw 
composer card import -f admin@manifesthlf12.card  
composer network ping -c admin@manifesthlf12