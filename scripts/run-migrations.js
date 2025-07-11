// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const MIGRATION_COMMAND = 'npx prisma migrate deploy';
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000;

let attempt = 0;

function runMigration() {
  attempt++;
  console.log(`\n🚀 Attempt ${attempt}: Running database migrations...`);

  const child = exec(MIGRATION_COMMAND);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('\n✅ Database migration successful!');
      process.exit(0);
    } else {
      console.error(
        `\n❌ Attempt ${attempt}: Migration failed with exit code ${code}.`
      );
      if (attempt < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`\n⏳ Retrying in ${delay / 1000} seconds...`);
        setTimeout(runMigration, delay);
      } else {
        console.error(
          `\n🚨 All ${MAX_RETRIES} migration attempts failed. Aborting.`
        );
        process.exit(1);
      }
    }
  });
}

runMigration();
