const cloneDeep = require('lodash.clonedeep');
const logger = require('./logger');
const { config } = require('winston');

class Logger {
    constructor(req) {
        this.req = req;
    }

    log(args) {
        const data = cloneDeep(args);
        data.level = data.level in config.cli.levels ? data.level : 'error';
        data.meta = data.meta || {};
        data.meta.req = cloneDeep(this.req);

        logger.log(data);
    }
}

module.exports = Logger;