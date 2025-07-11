import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe(`Delete question`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository) // System Under Test
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`question-1`),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: `author-1`,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`question-1`),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    // await sut.execute({
    //   questionId: newQuestion.id.toString(),
    //   authorId: `author-2`,
    // })

    expect(
      async () =>
        await sut.execute({
          questionId: newQuestion.id.toString(),
          authorId: `author-2`,
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
