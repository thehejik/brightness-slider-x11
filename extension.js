import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Slider from 'resource:///org/gnome/shell/ui/slider.js';

export default class BrightnessSliderExtension {
    constructor() {
        this._button = null;
        this._currentOutput = null;
    }

    enable() {
        this._button = new PanelMenu.Button(0.0, 'Brightness Slider');

        let icon = new St.Label({
            text: '☀',
            y_align: Clutter.ActorAlign.CENTER
        });
        this._button.add_child(icon);

        // Dropdown for display selection
        const displays = this._getConnectedOutputs();
        const displaySection = new PopupMenu.PopupSubMenuMenuItem('Select Display');

        displays.forEach(output => {
            const item = new PopupMenu.PopupMenuItem(output);
            item.connect('activate', () => {
                this._currentOutput = output;
            });
            displaySection.menu.addMenuItem(item);
        });

        this._currentOutput = displays[0] ?? null;

        let slider = new Slider.Slider(0.75);
        slider.connect('notify::value', () => {
            let value = Math.round(slider.value * 100);
            this._runXrandr(value);
        });

        const sliderItem = new PopupMenu.PopupBaseMenuItem({ activate: false });
        sliderItem.actor.add_child(slider);

        this._button.menu.addMenuItem(displaySection);
        this._button.menu.addMenuItem(sliderItem);

        Main.panel.addToStatusArea('brightnessSlider', this._button);
    }

    disable() {
        if (this._button) {
            this._button.destroy();
            this._button = null;
        }
    }

    _getConnectedOutputs() {
        try {
            const [ok, out, err] = GLib.spawn_command_line_sync('xrandr --query');
            if (!ok) return [];

            const outputStr = new TextDecoder().decode(out);
            const lines = outputStr.split('\n');

            const connected = lines
                .filter(line => line.includes(' connected'))
                .map(line => line.split(' ')[0]);

            return connected;
        } catch (e) {
            log(`BrightnessSlider: Failed to detect displays - ${e}`);
            return [];
        }
    }

    _runXrandr(value) {
        if (!this._currentOutput) return;

        // Ensure brightness is not set below 15%
        const clampedValue = Math.max(value, 15);
        const brightness = (clampedValue / 100).toFixed(2);
        const cmd = `xrandr --output ${this._currentOutput} --brightness ${brightness}`;
        GLib.spawn_command_line_async(cmd);
    }
}
