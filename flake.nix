{
  description = "uav-web dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            typescript-language-server
            vscode-langservers-extracted
          ];

          shellHook = ''
            echo "astro dev shell — node $(node --version), npm $(npm --version)"
          '';
        };
      });
}
