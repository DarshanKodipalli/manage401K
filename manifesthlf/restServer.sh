#!/bin/bash

export COMPOSER_CARD=admin@manifesthlf10

printenv | grep ^COMPOSER_CARD

export COMPOSER_NAMESPACES=never

printenv | grep ^COMPOSER_NAMESPACES

composer-rest-server --port 3001