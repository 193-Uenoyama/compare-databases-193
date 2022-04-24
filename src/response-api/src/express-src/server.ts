import app from '@/express-src/app'
import { checkCommunicationPossible } from '@/express-src/checkCommunicationPossible'
import ProcessingTimeLogWriter from '@/express-src/modules/processingLogStore/writeLogs/WriteProcessingTimeLog'

ProcessingTimeLogWriter.reservWriteLog();
app.listen(8000, async () => { 
  await checkCommunicationPossible();
  console.log('listening on port 8000!') 
});
