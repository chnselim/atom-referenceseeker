'use babel';

import AtomCodefinderView from './atom-codefinder-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCodefinderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCodefinderView = new AtomCodefinderView(state.atomCodefinderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCodefinderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-codefinder:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCodefinderView.destroy();
  },

  serialize() {
    return {
      atomCodefinderViewState: this.atomCodefinderView.serialize()
    };
  },

  toggle() {
    console.log('AtomCodefinder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};