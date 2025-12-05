#!/usr/bin/env bash

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "🎨 $1"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
}

print_step() {
  echo -e "${BLUE}▶${NC} $1"
}

print_success() {
  echo -e "${GREEN}✅${NC} $1"
}

print_error() {
  echo -e "${RED}❌${NC} $1"
}

check_port() {
  local port=$1

  if lsof -i :"$port" >/dev/null 2>&1; then
    print_error "Port $port is already in use"
    echo ""
    echo "Processes using port $port:"
    lsof -i :"$port" | grep LISTEN
    echo ""
    read -p "Kill the existing process? [y/N]: " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
      PIDS=$(lsof -ti :"$port")
      if [[ -n "$PIDS" ]]; then
        print_step "Killing processes: $PIDS"
        kill $PIDS
        sleep 1
        print_success "Port $port is now available"
      fi
    else
      exit 0
    fi
  else
    print_success "Port $port is available"
  fi
}

start_server() {
  print_header "HABERDASH COMPONENT LIBRARY"

  print_step "Building components..."
  if python3 build.py; then
    print_success "Build complete"
  else
    print_error "Build failed"
    exit 1
  fi

  echo ""
  check_port 8080

  echo ""
  echo "📦 Serving Haberdash component showcase"
  echo ""
  echo "Open in your browser:"
  echo -e "  ${GREEN}http://localhost:8080/dist/${NC}"
  echo ""
  echo "Press Ctrl+C to stop"
  echo ""

  cd dist && python3 -m http.server 8080
}

deploy_github() {
  print_header "DEPLOYING TO GITHUB PAGES"

  if [[ ! -d ".git" ]]; then
    print_error "Not a git repository"
    exit 1
  fi

  print_step "Building components..."
  if python3 build.py; then
    print_success "Build complete"
  else
    print_error "Build failed"
    exit 1
  fi

  echo ""
  print_step "Copying dist/ to root for GitHub Pages..."
  cp dist/haberdash.css ./
  cp dist/index.html ./
  print_success "Files copied to root"

  echo ""
  if [[ -n $(git status -s) ]]; then
    print_error "You have uncommitted changes"
    echo ""
    git status -s
    echo ""
    echo "Commit your changes first, then run:"
    echo -e "  ${GREEN}bash hooks.sh deploy${NC}"
    exit 1
  fi

  print_step "Pushing to GitHub..."
  git push origin master

  print_success "Deployed to GitHub!"
  echo ""
  echo "Your site will be available at:"
  echo -e "  ${GREEN}https://nickcottrell.github.io/haberdash/${NC}"
  echo ""
  echo "💡 GitHub Pages may take 1-2 minutes to update"
}

show_usage() {
  cat <<EOF
🎨 Haberdash - Portable Component Library

Usage:
  bash hooks.sh <command>

Commands:
  serve      Start local dev server on port 8080
  deploy     Push to GitHub (deploys to GitHub Pages)
  help       Show this help message

Examples:
  bash hooks.sh serve
  bash hooks.sh deploy

EOF
}

COMMAND=${1:-serve}

case "$COMMAND" in
  serve|local|start)
    start_server
    ;;
  deploy|push)
    deploy_github
    ;;
  help|--help|-h)
    show_usage
    ;;
  *)
    print_error "Unknown command: $COMMAND"
    echo ""
    show_usage
    exit 1
    ;;
esac
