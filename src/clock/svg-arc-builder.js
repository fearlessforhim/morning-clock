export default function(opts) {
  let defaultOpts = Object.assign({
    centerX: 200,
    centerY: 200,
    radiusX: 180,
    radiusY: 180,
    baseLineRotationDegrees: -90
  }, opts);

  let arcConfigs = [];

  function _f_matrix_times([[a,b], [c,d]], [x,y]){
    return [a*x + b*y, c*x + d*y];
  }

  let _f_rotate_matrix = (x) => {
    return [[Math.cos(x), -Math.sin(x)], [Math.sin(x), Math.cos(x)]];
  }

  let _f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

  let _degToRad = (deg) => deg * (Math.PI/180);

  let _f_svg_ellipse_arc = ([cx, cy], [rx, ry], [t1, delta], rotation, color, id, rounded) => {
    let myDelta = delta % (2 * Math.PI);
    const rotMatrix = _f_rotate_matrix(rotation);
    const [sX, sY] = (_f_vec_add(_f_matrix_times(rotMatrix, [rx * Math.cos(t1), ry * Math.sin(t1)]), [cx,cy]));
    const [eX, eY] = (_f_vec_add(_f_matrix_times(rotMatrix, [rx * Math.cos(t1+myDelta), ry * Math.sin(t1+ myDelta)]), [cx,cy]));
    const fA = ((myDelta > Math.PI) ? 1: 0);
    const fS = ((myDelta > 0) ? 1: 0);
    const path_2wk2r = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let path = `M ${sX} ${sY} A ${[rx, ry, rotation/(2 * Math.PI) * 360, fA, fS, eX, eY].join(" ")}`;
    let rtvColor = color || `black`;
    let rtvId = id || ``;

    path_2wk2r.setAttribute(`d`, path);
    path_2wk2r.setAttribute(`stroke`, rtvColor);
    path_2wk2r.setAttribute(`id`, rtvId);

    return {
      path: path,
      color: rtvColor,
      id: rtvId,
      rounded: rounded
    }
  }

  let addConfig = (config) => {
    arcConfigs.push(
      _f_svg_ellipse_arc(
        [config.centerX || defaultOpts.centerX, config.centerY || defaultOpts.centerY],
        [config.radiusX || defaultOpts.radiusX, config.radiusY || defaultOpts.radiusY],
        [_degToRad(config.startDegrees), _degToRad(config.lengthInDegrees)],
        _degToRad(defaultOpts.baseLineRotationDegrees),
        config.color,
        config.id,
        config.rounded || false
    )
  );
  }

  let getArcs = () => {
    return arcConfigs;
  }

  return {
    addConfig: addConfig,
    getArcs: getArcs
  }
}
