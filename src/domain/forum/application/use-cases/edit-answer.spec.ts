import type { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error(`Answer not found`)
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error(`Not allowed`)
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {}
  }
}

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe(`Delete answer`, () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new EditAnswerUseCase(inMemoryAnswersRepository) // System Under Test
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`answer-1`),
    )

    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: `author-1`,
      content: `Conteudo teste`,
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: `Conteudo teste`,
    })
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID(`author-1`),
      },
      new UniqueEntityID(`answer-1`),
    )

    inMemoryAnswersRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({
          answerId: newAnswer.id.toString(),
          authorId: `author-2`,
          content: `conteudo teste`,
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
