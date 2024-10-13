{ pkgs ? import <nixpkgs> {} }:
  
pkgs.mkShell {
  name = "bla";
  packages = with pkgs; [
    nodejs
    nodePackages.npm # do i need this? better have it anyway
    typescript
    sass
    inotify-tools
    http-server
  ];
}
