preReleaseVersions=$(pnpm why "@clicknclear/*" -r --depth 0 | grep "\.[0-9]*-")
unpublishedPackageChanges=$(pnpm lerna changed --include-merged-tags)

if [[ ! $preReleaseVersions && ! $unpublishedPackageChanges ]]; then
  exit 0
fi

echo "Package Version Fault - Merge Blocked"
echo ""

if [[ $preReleaseVersions ]]; then
  echo "Pre-release dependencies are being used:"
  echo "$preReleaseVersions"
  echo "To resolve, you need to remove any pre-release usage and/or graduate the pre-releases to releases upon approval of your PR."
  echo ""
fi

if [[ $unpublishedPackageChanges ]]; then
  echo "There are unpublished package changes:"
  echo "$unpublishedPackageChanges"
  echo "To resolve, you need to create pre-releases."
  echo ""
fi

exit 1
