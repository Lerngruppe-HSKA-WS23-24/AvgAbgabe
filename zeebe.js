const ZB = require('zeebe-node')
const dotenv = require('dotenv')

dotenv.config()

// Create a Zeebe client
const zeebeClient = new ZB.ZBClient();

// Worker to handle "Vertrag senden" task
zeebeClient.createWorker({
    taskType: 'vertragSenden',
    taskHandler: async job => {
        const candidateId = job.variables.candidateId;
        try {
            await zeebeClient.publishMessage({
                correlationKey: candidateId,
                messageId: 'vertrag',
                name: 'vertragErhalten',
                variables: {
                    candidateId: candidateId,
                },
            });

            console.log("Der Vertrag wurde zum Kandidat gesendet");
            job.complete();
        } catch (error) {
            job.error('Error occurred while starting Kandidat process:', error);
        }
    },

});

//Worker to handle "Antwort-senden" task
zeebeClient.createWorker({
    taskType: 'antwortSenden',
    taskHandler: async job => {
        const antwort = job.variables.antwort;
        const candidateId = job.variables.candidateId;
        try {
            await zeebeClient.publishMessage({
                correlationKey: candidateId,
                messageId: 'antwort',
                name: 'antwortErhalten',
                variables: {
                    antwort: antwort,
                    candidateId
                },
            });

            console.log("Die Antwort wurde an die HR-Abteilung gesendet");
            job.complete();
        } catch (error) {
            job.error('Error occurred while sending answer to HR process:', error);
        }
    },

});