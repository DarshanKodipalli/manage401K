#!/bin/bash
cd dist/ 
composer archive create -t dir -n ../ 
composer network install -a manifesthlf11@0.0.11.bna -c PeerAdmin@hlfv1 
composer network start -c PeerAdmin@hlfv1 -n manifesthlf11 -V 0.0.11 -A admin -S adminpw 
composer card import -f admin@manifesthlf11.card  
composer network ping -c admin@manifesthlf11