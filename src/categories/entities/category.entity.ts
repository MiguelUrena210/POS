import { Product } from '../../products/entities/product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category { // sin extends BaseEntity, usa DataMapper
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 60 })
    name: string
    

    @OneToMany(() => Product, (product) => product.category, { cascade: true}) 
    products: Product[] // Establece la relacion de uno a muchos con Products
}
