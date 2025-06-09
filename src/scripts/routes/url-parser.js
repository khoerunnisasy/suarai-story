function extractPathnameSegments(path) {
  const splitUrl = path.split("/");

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = "";

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat("/:id");
  }

  return pathname || "/";
}

// 🔍 Mengambil pathname aktif dari hash URL (tanpa "#" dan slash di akhir)
export function getActivePathname() {
  return location.hash.replace("#", "").replace(/\/+$/, "") || "/";
}

// 🔍 Mengambil route aktif seperti '/detail/:id'
export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

// 🔍 Mengambil resource dan ID dari hash URL aktif
export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

// 🔍 Mengambil route dari pathname statis
export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

// 🔍 Mengambil segment dari path tertentu (misalnya untuk testing)
export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
