import * as Server from '../index'
import * as DataSource from '../DataSource'
import logger from '../utils/logger'
import { BaseCommand } from './base'

export default class Start extends BaseCommand {
    async run(): Promise<void> {
        logger.info('Starting Akira...')
        await DataSource.init()
        await Server.start()
    }

    async catch(error: Error) {
        if (error.stack) logger.error(error.stack)
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        await this.failExit()
    }

    async stopProcess() {
        try {
            logger.info(`Shutting down Akira...`)
            const serverApp = Server.getInstance()
            if (serverApp) await serverApp.stopApp()
        } catch (error) {
            logger.error('There was an error shutting down Akira...', error)
            await this.failExit()
        }

        await this.gracefullyExit()
    }
}
