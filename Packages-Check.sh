packages=$(pnpm lerna changed --include-merged-tags)
if [[ $packages ]]; then
  echo "There are unpublished package changes: $packages"
  exit 1
fi
