import app from '@/express-src/app'
import ProcessingTimeLogWriter from '@/express-src/modules/writeLogs/WriteProcessingTimeLog'

ProcessingTimeLogWriter.reservWriteLog();
app.listen(8000, () => console.log('listening on port 8000!'));
