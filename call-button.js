/* eslint-disable max-len */
/* eslint-disable-next-line max-len */
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/notification-icons.js';
import '@polymer/iron-icons/communication-icons.js';

const callStatuses = {
  default: {
    label: '',
    icon: 'communication:phone',
  },
  active: {
    label: 'ringin',
    icon: 'notification:phone-in-talk',
  },
  error: {
    label: 'failed',
    icon: 'notification:phone-missed',
  },
};

/**
 * `call-button`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CallButton extends PolymerElement {
  /**
   * @return {!HTMLTemplateElement}
   */
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      
      #label-status {
        align-items: center;
        background-color: var(--paper-grey-900);
        border-radius: 2em;
        color: white;
        display: flex;
        height: 2.9em;
        opacity: 1;
        padding: 0 0 0 4em;
        transition: .2s all ease-in-out .25s;
        width: 5em;
      }
      
      #label-status.default {
        width: 0;
        opacity: 0;
      }
      
      paper-icon-button {
        background-color: var(--paper-grey-900);
        border-radius: 2em;
        color: white;
        position: absolute;
      }

      paper-icon-button.active {
        background-color: var(--paper-green-600);
      }

      paper-icon-button.error {
        background-color: var(--paper-red-700);
      }
    </style>

      <paper-icon-button icon="[[buttonIcon]]" on-tap="call" class$="[[status]]"></paper-icon-button>
      <div id="label-status" class$=[[status]]>[[label]]</div>
`;
  }

  /**
   * @return {string}
   */
  static get is() {
    return 'call-button';
  }

  /**
   * @return {object}
   */
  static get properties() {
    return {
      status: {
        type: String,
        value: 'default',
        observer: 'statusObserver',
      },
      label: {
        type: String,
        value: null,
      },
      buttonIcon: {
        type: String,
        value: 'communication:phone',
      },
    };
  }

  /**
   * call
   *
   * @private
   */
  call() {
    this._event('call-button-fired');
  }

  /**
   * status observer
   *
   * @param {string} status
   * @private
   */
  statusObserver(status) {
    if (!status) return;

    this.label = callStatuses[status].label;
    this.buttonIcon = callStatuses[status].icon;
  }

  /**
   * Fire event
   *
   * @param {string} name
   * @param {null|string|boolean} detail
   * @private
   */
  _event(name, detail = '') {
    this.dispatchEvent(new CustomEvent(name, {
      detail: detail, bubbles: true, composed: true,
    }));
  }
}

window.customElements.define(CallButton.is, CallButton);
