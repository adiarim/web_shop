import { useProductsStore } from '../store/products-store.js'
import { useEffect } from 'react'
import { Col, Row, Input, Segmented, Spin, Empty, Typography, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ProductCard } from '../components/Product-card.jsx'
import { useFiltersStore } from '../store/use-filters.js'
import { useDebounce } from '../hooks/use-debounce.js'
import { useCategory } from '../store/category-store.js'

const { Text } = Typography

export function Products() {
    const { data, loading, loadData, error } = useProductsStore()
    const { data: categories, loadCategories } = useCategory()
    const { search, setSearch, categoryId, setCategoryId } = useFiltersStore()
    const debouncedSearch = useDebounce(search, 500)

    useEffect(() => {
        loadData(debouncedSearch, categoryId)
    }, [debouncedSearch, categoryId])

    useEffect(() => {
        loadCategories()
    }, [])

    const resetFilters = () => {
        setCategoryId(null)
        setSearch('')
    }

    if (loading) {
        return <div>LOADING...</div>
    }

    return (
        <div className="page page-products">
            <div className="page-products__controls">
                <Input
                    allowClear
                    size="large"
                    placeholder="Поиск по названию (например, Jeans)..."
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="page-products__search"
                />

                <Segmented
                    size="large"
                    options={categories}
                    value={categoryId}
                    onChange={(val) => setCategoryId(val)}
                    className="page-products__categories"
                />
                <Button onClick={resetFilters}>Сбросить фильтры</Button>
            </div>

            {error && (
                <Text type="danger" className="page-products__error">
                    {error}
                </Text>
            )}

            <Spin spinning={loading}>
                {data?.length === 0 && !loading ? (
                    <div className="page-products__empty">
                        <Empty
                            description={
                                <span>Ничего не найдено. Измените поисковый запрос или фильтры.</span>
                            }
                        />
                    </div>
                ) : (
                    <Row gutter={[24, 24]}>
                        {data?.map((product) => (
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Spin>
        </div>
    )
}