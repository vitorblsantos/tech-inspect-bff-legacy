import firebase from 'firebase-admin'
import { Injectable } from '@nestjs/common'

import { Firestore } from '@google-cloud/firestore'
import { IRepositoryInspecoes } from '@/interfaces/index.interfaces'

@Injectable()
export abstract class RepositoryInspecoes<T>
  implements IRepositoryInspecoes<T>
{
  protected db: Firestore
  protected abstract collectionName: string

  constructor() {
    this.db = firebase.firestore()
  }

  async create(data: T): Promise<T> {
    const docRef = this.db.collection(this.collectionName).doc()
    await docRef.set(data)
    return { id: docRef.id, ...data } as any
  }

  async findOne(id: string): Promise<T> {
    const docRef = this.db.collection(this.collectionName).doc(id)
    const doc = await docRef.get()
    if (!doc.exists) {
      throw new Error('Document not found')
    }
    return doc.data() as T
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = this.db.collection(this.collectionName).doc(id)
    await docRef.update(data)
  }

  async delete(id: string): Promise<void> {
    const docRef = this.db.collection(this.collectionName).doc(id)
    await docRef.delete()
  }

  async findAll(): Promise<T[]> {
    const snapshot = await this.db.collection(this.collectionName).get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[]
  }
}
