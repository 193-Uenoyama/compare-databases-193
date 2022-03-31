#!/bin/bash

function readUser() {
  curl -s localhost:8000/user/read
}
