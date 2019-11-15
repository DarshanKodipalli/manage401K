#!/bin/bash
cd dist/ 
composer archive create -t dir -n ../ 
composer network install -a manifesthlf13@0.0.13.bna -c PeerAdmin@hlfv1 
composer network start -c PeerAdmin@hlfv1 -n manifesthlf13 -V 0.0.13 -A admin -S adminpw 
composer card import -f admin@manifesthlf13.card  
composer network ping -c admin@manifesthlf13