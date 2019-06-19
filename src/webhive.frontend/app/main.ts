import * as loadScript from '@shinin/load-script';
import 'a-wc-router/src/router';
import './style.css';

loadScript('header.js');
loadScript('nav.js');

window.addEventListener('onRouterAdded', (e) => {
    console.log('onRouterAdded', e);
});

window.addEventListener('onRouteMatch', (e) => {
    console.log('onRouteMatch', e);
});

window.addEventListener('onRouteLeave', (e) => {
    console.log('onRouteLeave', e);
});

window.addEventListener('onRouteNotHandled', (e) => {
    console.log('onRouteNotHandled', e);
});

window.addEventListener('onRouteCancelled', (e) => {
    console.log('onRouteCancelled', e);
});

window.addEventListener('onLinkActiveStatusUpdated', (e) => {
    console.log('onLinkActiveStatusUpdated', e);
});

window.addEventListener('onOutletUpdated', (e) => {
    console.log('onOutletUpdated', e);
});
