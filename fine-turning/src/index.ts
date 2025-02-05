import openai from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY,
});

//  ============== UPLOAD THE FILE WITH DATA TO OPENAI ==============
// try {
//   const motivationText = fs.createReadStream(
//     path.join(__dirname, '../../motivationBotData.jsonl'),
//     'utf8',
//   );

//   const uploadFile = client.files.create({
//     file: motivationText,
//     purpose: 'fine-tune',
//   });
//   console.log(JSON.stringify(uploadFile, null, 2));
//  ========= GOT THIS FILE ID: file-64dXSSRNM2jbr7W133y4vN ===========
// } catch (error) {
//   console.error(error);
// }

//  ============== Launch fine tuning job ==============
// const fileTune = client.fineTuning.jobs.create({
//   training_file: 'file-64dXSSRNM2jbr7W133y4vN',
//   model: 'gpt-3.5-turbo',
// });

// fileTune
//   .then(response => console.log(response))
//   .catch(error => console.error(error));
// {
//   object: 'fine_tuning.job',
//   id: 'ftjob-vWxUYr7oY43dxzA5ETJOLcNW',
//   model: 'gpt-3.5-turbo-0125',
//   created_at: 1738764264,
//   finished_at: null,
//   fine_tuned_model: null,
//   organization_id: 'org-DbKRfUPY5lLycuAUKwMXBGgN',
//   result_files: [],
//   status: 'validating_files', // can check the status of the fine tuning job https://platform.openai.com/finetune/ftjob-vWxUYr7oY43dxzA5ETJOLcNW?filter=all
//   validation_file: null,
//   training_file: 'file-64dXSSRNM2jbr7W133y4vN',
//   hyperparameters: {
//     n_epochs: 'auto',
//     batch_size: 'auto',
//     learning_rate_multiplier: 'auto'
//   },
//   trained_tokens: null,
//   error: {},
//   user_provided_suffix: null,
//   seed: 1544428029,
//   estimated_finish: null,
//   integrations: [],
//   method: { type: 'supervised', supervised: { hyperparameters: [Object] } }
// }

//  ============== CHECK THE STATUS OF THE FINE TUNING JOB ==============
// const fineTuneStatus = client.fineTuning.jobs.retrieve(
//   'ftjob-vWxUYr7oY43dxzA5ETJOLcNW',
// );
// fineTuneStatus
//   .then(response => console.log(response))
//   .catch(error => console.error(error));
// fineturning model id : ft:gpt-3.5-turbo-0125:personal::AxaRNDpM

async function main() {
  const response = await client.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-0125:personal::AxaRNDpM',
    messages: [
      {
        role: 'user',
        content: "I don't know what to do with my life",
      },
    ],
  });

  return response.choices[0].message.content;
}

main()
  .then(message => {
    console.log(message);
    // response: It's okay to feel lost or uncertain about your path in life. It's a common experience for many people. One helpful approach is to take some time to reflect on your interests, values, and goals. What activities or topics do you feel passionate about? In what kind of work or lifestyle do you see yourself being fulfilled? Speaking with a career counselor or life coach may also provide valuable guidance. Remember, it's never too late to make changes and pursue new opportunities.
  })
  .catch(console.error);
