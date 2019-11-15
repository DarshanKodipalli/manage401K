#!/bin/bash

export COMPOSER_CARD=admin@manifesthlf13

printenv | grep ^COMPOSER_CARD

export COMPOSER_NAMESPACES=never

printenv | grep ^COMPOSER_NAMESPACES

composer-rest-server --port 3001