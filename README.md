# Brightness Slider Extension for GNOME Shell on X11

This GNOME Shell extension adds a brightness slider to the top panel, allowing you to easily adjust the screen brightness of your connected displays. It also includes a dropdown menu to select the display you want to control, making it ideal for multi-monitor setups.

## Features

- **Brightness Control**: Adjust the brightness of your screen(s) using a convenient slider.
- **Multi-Monitor Support**: Select which display to control from a dropdown menu.
- **Minimum Brightness Protection**: Prevents brightness from being set below 15% to avoid screen visibility issues.

## Requirements

- GNOME Shell (tested on GNOME 48)
- X11 Window System (Wayland is not supported by xrandr)
- `xrandr` command-line tool (usually pre-installed on most Linux distributions)

## Installation

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/thehejik/brightness-slider-x11.git
```

### 2. Copy to GNOME Extensions Directory
Copy the extension folder to your GNOME Shell extensions directory:
```bash
mkdir ~/.local/share/gnome-shell/extensions/brightness-slider-x11@thehejik
cp brightness-slider-x11/* ~/.local/share/gnome-shell/extensions/brightness-slider-x11@thehejik/
```

### 3. Enable the Extension
- Restart GNOME Shell by pressing `Alt + F2`, typing `r`, and pressing Enter (on X11).
- Open the GNOME Extensions app or use the GNOME Extensions to enable the "Brightness Slider" extension.

## Usage

1. After enabling the extension, you will see a ☀ icon in the top panel.
2. Click the icon to open the brightness slider and display selection menu.
3. Use the slider to adjust the brightness of the selected display.

## Troubleshooting

- If the extension does not work, ensure that `xrandr` is installed and accessible from the terminal.
- Looking glass for debugging by pressing `Alt + F2`, typing `r`, pressing Enter (on X11) and switching to Extensions pane.
- Check the GNOME Shell logs for errors:
  ```bash
  journalctl /usr/bin/gnome-shell -f
  ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
